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



  public Category actualizarCategory(Category category) {
		if (category.getId() != null) {
			Optional<Category> e = categoryRepository.getCategory(category.getId());
			if (!e.isEmpty()) {
				if (category.getName() != null) {
					e.get().setName(category.getName());
				}
				if (category.getDescription() != null) {
					e.get().setDescription(category.getDescription());
				}

				categoryRepository.save(e.get());
				return e.get();
			} else {
				return category;
			}
		} else {
			return category;
		}

	}

	public boolean borrarCategory(int id) {
		boolean flag = false;
		Optional<Category> c = categoryRepository.getCategory(id);
		if (c.isPresent()) {
			categoryRepository.delete(c.get());
			flag = true;
		}
		return flag;

	}


  
}
