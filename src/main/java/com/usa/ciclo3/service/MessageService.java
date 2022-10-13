package com.usa.ciclo3.service;

import java.util.List;
import java.util.Optional;

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

  public Optional<Message> getMessage(int id) {
		return messageRepository.getMessage(id);
	}

  public Message save(Message message) {
		// return messageRepository.save(message);

		if (message.getIdMessage() == null) {
			return messageRepository.save(message);
		} else {
			Optional<Message> paux = messageRepository.getMessage(message.getIdMessage());
			if (paux.isEmpty()) {
				return messageRepository.save(message);
			} else {
				return message;
			}
		}

	}

	public Message actualizarMessage(Message message) {
		if (message.getIdMessage() != null) {
			Optional<Message> e = messageRepository.getMessage(message.getIdMessage());
			if (!e.isEmpty()) {
				if (message.getMessageText() != null) {
					e.get().setMessageText(message.getMessageText());
				}
				
				messageRepository.save(e.get());
				return e.get();
			} else {
				return message;
			}
		} else {
			return message;
		}

	}
	
	
	public boolean borrarMessage(int id) {
		boolean flag = false;
		Optional<Message> c = messageRepository.getMessage(id);
		if (c.isPresent()) {
			messageRepository.delete(c.get());
			flag = true;
		}
		return flag;

	}
  
}
