package com.usa.ciclo3.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.usa.ciclo3.model.Message;
import com.usa.ciclo3.repository.crud.MessageCrudRepository;

@Repository
public class MessageRepository {
	
	@Autowired
	private MessageCrudRepository messageCrudRepository;
	
	public List<Message> getAll(){
		return (List<Message>) messageCrudRepository.findAll();
	}
	
	//public Optional<Message> getMessage(int id){
	//	return messageCrudRepository.findById(id);
	//}
	
	public Message save(Message message) {
		return messageCrudRepository.save(message);
	}
}
