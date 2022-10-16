package com.usa.ciclo3.repository.crud;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.usa.ciclo3.model.Reservation;

public interface ReservationCrudRepository extends CrudRepository<Reservation, Integer>
 {
  // Cantidad de reservas en un tiempo determinado.
	// Cantidad de reservas completadas vs canceladas.
	// SELECT * FROM Reservation WHERE startDate AFTER fechaEntradaInicial AND devolutionDate BEFORE fechaEntradaFin
		
	public List<Reservation> findAllByStartDateAfterAndDevolutionDateBefore(Date dateOne, Date dateTwo);
	
	
	// Cantidad de reservas completadas vs canceladas.
	// SELECT * FROM Reservation where status "lo que yo quiero"
	
	public  List<Reservation> findAllByStatus(String status);
	
	
	@Query("SELECT c.client, COUNT(c.client) from Reservation  AS c  group by c.client order by COUNT(c.client)DESC ")
    //public List<Object[]> reporteClientes();
    public List<Object[]> countTotalReservationsByClient();
}
