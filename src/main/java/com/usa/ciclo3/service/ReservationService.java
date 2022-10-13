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
  
}
