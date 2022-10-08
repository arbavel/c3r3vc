package com.usa.ciclo3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usa.ciclo3.model.Category;
import com.usa.ciclo3.repository.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	public  List<Category>  getAll(){
    return (List<Category>) categoryRepository.getAll();
  }

  public Optional<Category> getCategory(int id){
    return categoryRepository.getCategory(id);
  }

  public Category  save(Category category){
    //return categoryRepository.save(category);
    
    if(category.getId()==null) {
      return categoryRepository.save(category);
    }else {
      Optional<Category> paux=categoryRepository.getCategory(category.getId());
      if(paux.isEmpty()) {
        return categoryRepository.save(category);
      }else {
        return category;
      }
    }
    
	}
  
}
