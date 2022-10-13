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

import com.usa.ciclo3.model.Reservation;
import com.usa.ciclo3.service.ReservationService;

@RestController
@RequestMapping("/api/Reservation")
@CrossOrigin (origins ="*",methods ={RequestMethod.GET ,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT})
public class ReservationController {
	
	@Autowired
    private ReservationService reservationService;
	
	

	  @GetMapping("/all")
	  public List<Reservation> getReservations(){
	      return reservationService.getAll();
	  }
	
	  @GetMapping("/{id}")
	  public Optional<Reservation> getCategories (@PathVariable("id") int idReservation){
	    //  return reservationService.getReservation(id) ;
	      return reservationService.getReservation(idReservation) ;
	  }
	
	  @PostMapping("save")
	  @ResponseStatus(HttpStatus.CREATED)
	  public Reservation save(@RequestBody Reservation reservation){		  
		  return reservationService.save(reservation);
	  }	

		@PutMapping("/update")
	  @ResponseStatus(HttpStatus.CREATED)
	  public Reservation actualizarReservation(@RequestBody Reservation reservation){
		  return reservationService.actualizarReservation(reservation);
	  }
	  
	  
	  
	  @DeleteMapping("/{id}")
	  public boolean borrarReservation(@PathVariable("id") int idReservation) {
		  return reservationService.borrarReservation(idReservation);
	  }
  
}
