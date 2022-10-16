package com.usa.ciclo3.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.usa.ciclo3.model.Partyroom;
import com.usa.ciclo3.service.PartyroomService;

@RestController
@RequestMapping("Partyroom")
@CrossOrigin (origins ="*",methods ={RequestMethod.GET ,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class PartyroomController {
	
	@Autowired
    private PartyroomService partyroomService;
	
	

	  @GetMapping("/all")
	  public List<Partyroom> getAll(){
	      return partyroomService.getAll();
	  }
	
	  @GetMapping("/{id}")
	  public Optional<Partyroom> getPartyroom (@PathVariable("id") int id){
	      return partyroomService.getPartyroom(id) ;
	  }
	
	  @PostMapping("/save")
	  @ResponseStatus(HttpStatus.CREATED)
	  public Partyroom save(@RequestBody Partyroom partyroom){		  
		  return partyroomService.save(partyroom);
	  }	
		
		@PutMapping("/update")
	  @ResponseStatus(HttpStatus.CREATED)
	  public Partyroom actualizarPartyroom(@RequestBody Partyroom partyroom){
		  return partyroomService.actualizarPartyroom(partyroom);
	  }
	  
	  
	  @DeleteMapping("/{id}")
	  @ResponseStatus(HttpStatus.NO_CONTENT)
	  public boolean borrarPartyroom(@PathVariable Integer id) {
		  return partyroomService.borrarPartyroom(id);
	  }
  
}
