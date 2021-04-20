package com.flamup.spring.Services;

import com.flamup.spring.DTO.OrderDTO;
import com.flamup.spring.DTO.UpdateOrderDTO;
import com.flamup.spring.Models.OrderItem;
import com.flamup.spring.Models.Product;
import com.flamup.spring.Models.ShoppingCart;
import com.flamup.spring.Repositories.CartRepository;
import com.flamup.spring.Repositories.OrderRepository;
import com.flamup.spring.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;


    @Autowired
    public CartService(CartRepository cartRepository,
                       ProductRepository productRepository,
                       OrderRepository orderRepository
                       ) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public String addToCart(OrderDTO order){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if ( principal instanceof UserDetails) {

            Optional<ShoppingCart> cartFromRepo = cartRepository.findByUserId(((UserDetails) principal).getUsername());
            ShoppingCart cart;
            if ( ! cartFromRepo.isPresent() ){
                cart = new ShoppingCart();
                cart.setUserId(((UserDetails) principal).getUsername());
                cartRepository.save(cart);
            }
            else{
                cart = cartFromRepo.get();
            }

            OrderItem item = new OrderItem();
            Product pt = productRepository.findProductById(order.getProductId())
                    .orElseThrow( () -> new IllegalStateException("product not found"));
            item.fromDto(pt, cart, order.getQuantity());

            orderRepository.save(item);
            return "SUCCESS";
        }
        else{
            throw  new IllegalStateException("user not authenticated");
        }
    }


    private Integer sanitizePrice( String price) {
        // price with Rs.2,244 --> 2244
        price  = price.substring(3).replace(",", "");
        return Integer.parseInt(price);
    }



    public HashMap<String, Object> getProducts(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("products" , new ArrayList<>());
        hs.put("total" , 0);
        if ( principal instanceof UserDetails) {
            Optional<ShoppingCart> cartFromRepo = cartRepository.findByUserId(((UserDetails) principal).getUsername());
            ShoppingCart cart;
            if ( ! cartFromRepo.isPresent() ){
                return hs;
            }
            cart = cartFromRepo.get();
            ArrayList<OrderItem> orders = new ArrayList<>(orderRepository.findByCart_Id(cart.getId()));
            hs.put("products" ,  orders);
            int price =0;
            for ( OrderItem order : orders ){
                if ( order.getProduct().getE_arrival().toLowerCase(Locale.ROOT).equals("old")){
                    price += order.getQuantity() * order.getProduct().getF_discount();
                }
                else {
                    price += order.getQuantity() * sanitizePrice(order.getProduct().getD_price());
                }
            }
            hs.put("total", price);
            return hs;
        }
        else{
            throw  new IllegalStateException("user not authenticated");
        }
    }



    public String updateOrder(UpdateOrderDTO updateOrderDTO){
        OrderItem item = orderRepository.findById(updateOrderDTO.getId())
                .orElseThrow(()->new IllegalStateException("order does not exist"));

        item.setQuantity(updateOrderDTO.getQuantity());
        orderRepository.save(item);
        return "SUCCESS";
    }


    public String deleteOrder( String id){
        OrderItem item = orderRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("order does not exist"));
        orderRepository.delete(item);
        return "DELETED";
    }


}
