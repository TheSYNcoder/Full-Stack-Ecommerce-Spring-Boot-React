package com.flamup.spring.Repositories;

import com.flamup.spring.Models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface ProductRepository extends JpaRepository<Product, Long> {


    Optional<Product> findProductById( Long id);

    @Query("select p from Product p where LOWER(p.b_dresstype) LIKE LOWER(CONCAT('%', :type, '%'))")
    List<Product> findProductsByB_Dresstype(@Param("type") String type);

    @Query(value = "select p from Product p where LOWER(p.a_sex)=lower(:sex) order by p.e_arrival desc ")
    Page<Product> findProductByA_sex(@Param("sex") String sex, Pageable paging);

    @Query(value = "select p from Product p where LOWER(p.e_arrival)=LOWER(:arrival) and LOWER(p.a_sex)=LOWER(:sex)")
    List<Product> findProductsByE_arrivalAndA_sex(@Param("arrival") String arrival, @Param("sex") String sex);


}
