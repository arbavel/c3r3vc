package com.usa.ciclo3.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.usa.ciclo3.model.Message;
import com.usa.ciclo3.service.MessageService;

@RestController
@RequestMapping("/api/Message")
@CrossOrigin (origins ="*",methods ={RequestMethod.GET ,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@GetMapping("/all")
	public List<Message> getMessages(){
	    return messageService.getAll();
	}
	
	//@GetMapping("/{id}")
	//public Optional<Message> getCategories (@PathVariable("id") int id){
	//    return messageService.getMessage(id) ;
	//}
	
	@PostMapping("save")
	@ResponseStatus(HttpStatus.CREATED)
	public Message save(@RequestBody Message message){		  
		return messageService.save(message);
	}
  
}
