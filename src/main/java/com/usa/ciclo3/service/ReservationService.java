package com.usa.ciclo3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usa.ciclo3.model.Reservation;
import com.usa.ciclo3.repository.ReservationRepository;

@Service
public class ReservationService {
	
	@Autowired
	private ReservationRepository reservationRepository;

  
	public  List<Reservation>  getAll(){
    return (List<Reservation>) reservationRepository.getAll();
  }

	  public Optional<Reservation> getReservation(int id){
	    return reservationRepository.getReservation(id);
	  }

	  public Reservation  save(Reservation reservation){
	    return reservationRepository.save(reservation);
	    
	}
  
}
