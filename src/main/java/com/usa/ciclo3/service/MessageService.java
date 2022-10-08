package com.usa.ciclo3.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usa.ciclo3.model.Message;
import com.usa.ciclo3.repository.MessageRepository;

@Service
public class MessageService {
	
	@Autowired
	private MessageRepository messageRepository;
	
	public  List<Message>  getAll(){
    return (List<Message>) messageRepository.getAll();
  }

  //public Optional<Message> getMessage(int id){
  //  return messageRepository.getMessage(id);
  //}

  public Message  save(Message message){
    return messageRepository.save(message);
    
	}
  
}
