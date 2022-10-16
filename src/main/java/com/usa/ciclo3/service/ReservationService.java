package com.usa.ciclo3.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usa.ciclo3.model.Reservation;
import com.usa.ciclo3.model.DTOs.CompletedAndCancelled;
import com.usa.ciclo3.model.DTOs.TotalAndClient;
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

	  public Reservation save(Reservation reservation) {
			// return reservationRepository.save(reservation);
	
			if (reservation.getIdReservation() == null) {
				return reservationRepository.save(reservation);
			} else {
				Optional<Reservation> paux = reservationRepository.getReservation(reservation.getIdReservation());
				if (paux.isEmpty()) {
					return reservationRepository.save(reservation);
				} else {
					return reservation;
				}
			}
	
		}
	
		public Reservation actualizarReservation(Reservation reservation) {
			if (reservation.getIdReservation() != null) {
				Optional<Reservation> e = reservationRepository.getReservation(reservation.getIdReservation());
				if (!e.isEmpty()) {
					if (reservation.getStartDate() != null) {
						e.get().setStartDate(reservation.getStartDate());
					}
					if (reservation.getDevolutionDate() != null) {
						e.get().setDevolutionDate(reservation.getDevolutionDate());
					}
					if (reservation.getStatus() != null) {
						e.get().setStatus(reservation.getStatus());
					}
	
					reservationRepository.save(e.get());
					return e.get();
				} else {
					return reservation;
				}
			} else {
				return reservation;
			}
	
		}
		
		
		public boolean borrarReservation(int id) {
			boolean flag = false;
			Optional<Reservation> c = reservationRepository.getReservation(id);
			if (c.isPresent()) {
				reservationRepository.delete(c.get());
				flag = true;
			}
			return flag;
	
		}


		// Reto 5
	
	public List<Reservation> getReservationsInPeriodReport(String dateA, String dateB){
		SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
		Date a = new Date();
		Date b = new Date();
		try {
			a = parser.parse(dateA);
			b = parser.parse(dateB);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		if(a.before(b)) {
			return reservationRepository.getReservationInPeriod(a, b);
		}else {
			return new ArrayList<>();
		}
	}
	
	public CompletedAndCancelled getReservationStatusReport() {
		
		List<Reservation> completed = reservationRepository.getReservationByStatus("completed");
		List<Reservation> cancelled = reservationRepository.getReservationByStatus("cancelled");
		
		return new CompletedAndCancelled((long)completed.size(), (long)cancelled.size());
		
	}
	
	public List<TotalAndClient> getTopClientsReport(){
		return reservationRepository.getTopClients();
	}
  
}
