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

    Optional<Product> findProductByDresstype(String dresstype);

    Optional<Product> findProductById( Long id);

    @Query("select p from Product p where LOWER(p.dresstype) LIKE LOWER(CONCAT('%', :type, '%'))")
    List<Product> findProductsByDresstype(@Param("type") String type);

    @Query(value = "select p from Product p where LOWER(p.sex)=lower(:sex) order by p.arrival desc ")
    Page<Product> findProductBySex(@Param("sex") String sex, Pageable paging);

    @Query(value = "select p from Product p where LOWER(p.arrival)=LOWER(:arrival) and LOWER(p.sex)=LOWER(:sex)")
    List<Product> findProductsByArrivalAndSex(@Param("arrival") String arrival, @Param("sex") String sex);


}
