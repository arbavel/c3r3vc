package com.usa.ciclo3.repository.crud;

import org.springframework.data.repository.CrudRepository;

import com.usa.ciclo3.model.Message;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
  
}
