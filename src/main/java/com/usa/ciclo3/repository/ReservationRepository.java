package com.usa.ciclo3.repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.usa.ciclo3.model.Client;
import com.usa.ciclo3.model.Reservation;
import com.usa.ciclo3.model.DTOs.TotalAndClient;
import com.usa.ciclo3.repository.crud.ReservationCrudRepository;

@Repository
public class ReservationRepository {
	
	@Autowired
	private ReservationCrudRepository reservationCrudRepository;
	
	public List<Reservation> getAll(){
		return (List<Reservation>) reservationCrudRepository.findAll();
	}
	
	public Optional<Reservation> getReservation(int id){
		return reservationCrudRepository.findById(id);
	}
	
	public Reservation save(Reservation reservation) {
		return reservationCrudRepository.save(reservation);
	}

	public void delete(Reservation reservation) {
		reservationCrudRepository.delete(reservation);
		
	}

	// Reto 5
	
	public List<Reservation> getReservationInPeriod(Date a, Date b){
		return reservationCrudRepository.findAllByStartDateAfterAndDevolutionDateBefore(a, b);
		
	}
	
	public List<Reservation> getReservationByStatus(String status){
		return reservationCrudRepository.findAllByStatus(status);
	}
	
	public List<TotalAndClient>getTopClients(){
		
		List<TotalAndClient> respuesta = new ArrayList<>();
		List<Object[] >reporte = reservationCrudRepository.countTotalReservationsByClient();
		
		
		
		for(int i=0; i<reporte.size(); i++) {
			respuesta.add(new TotalAndClient( (Long) reporte.get(i)[1], (Client) reporte.get(i)[0]));
		}
		
		return respuesta;
		
		
	}
  
}
