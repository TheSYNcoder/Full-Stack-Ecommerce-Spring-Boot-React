package com.flamup.spring.Services;

import com.flamup.spring.Models.Product;
import com.flamup.spring.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

//    public Product getByDressType( String dresstype ){
//        return productRepository.findProductByB_dresstype(dresstype)
//                .orElseThrow(() -> new IllegalStateException("Dress not found"));
//    }

    public List<Product> getProductsByDressType( String dresstype){
        return productRepository.findProductsByB_Dresstype(dresstype);
    }


    public HashMap<String, Object> getProductsBySex(String sex, Integer pageSize, Integer page, Map<Boolean, Long> countBySex){

        Pageable paging = PageRequest.of(page , pageSize);
        Page<Product> prods = productRepository.findProductByA_sex(sex, paging);
        List<Product> newProds = productRepository.findProductsByE_arrivalAndA_sex("new" ,sex);
        Integer totalPages = prods.getTotalPages();
        List<Product> products = prods.getContent();
        products = rearrange(products, countBySex, newProds);
        Integer current = page;
        HashMap<String, Object> hs = new HashMap<>();
        hs.put("current" , current);
        hs.put("products" , products);
        hs.put("total" , totalPages);
        return hs;

    }


    private List<Product> rearrange( List<Product> products, Map<Boolean, Long> countBySex, List<Product> newProds){

        List<Product> ll = new ArrayList<>(products);
        Product ptemp = ll.get(0);
        ll.remove(ptemp);
        ll.add(0, newProds.get(0));


        if ( (long)( countBySex.get(true) + countBySex.get(false) ) == 0){
            return ll;
        }

        Integer toShift =
                (int)(long)( (double) countBySex.get(false)  / (countBySex.get(true) + countBySex.get(false)) * products.size()) ;

        System.out.println("toShift" + toShift);
        int pivot = Math.max( 0 , (int) (Math.random() * 50) - 5 );
        for ( int start =0; start < Math.min(Math.min(Math.min( products.size() , toShift), newProds.size() ), 7) ; start++){
            Product p = ll.get(start );
            ll.remove(p);
            ll.add(0, newProds.get(start + pivot ));
        }
        return ll;
    }
}
