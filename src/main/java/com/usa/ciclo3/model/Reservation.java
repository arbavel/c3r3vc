package com.usa.ciclo3.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="reservation")
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idReservation;
	private Date startDate;
	private Date devolutionDate;
	private String status="created";
	
	
	 // Muchas reservaciones para un solo room 
    @ManyToOne
    @JoinColumn(name="partyroom")
    @JsonIgnoreProperties({"reservations"})
    private Partyroom partyroom;

    // Muchas reservas para un cliente 
    @ManyToOne
    @JoinColumn(name="client")
    @JsonIgnoreProperties({"reservations","messages"})
    private Client client;

    @OneToOne(cascade = {CascadeType.REMOVE},mappedBy="reservation")
    @JsonIgnoreProperties("reservation")
    private Score score;

    //private String score;

    public Integer getIdReservation() {
      return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
      this.idReservation = idReservation;
    }

    public Date getStartDate() {
      return startDate;
    }

    public void setStartDate(Date startDate) {
      this.startDate = startDate;
    }

    public Date getDevolutionDate() {
      return devolutionDate;
    }

    public void setDevolutionDate(Date devolutionDate) {
      this.devolutionDate = devolutionDate;
    }

    public String getStatus() {
      return status;
    }

    public void setStatus(String status) {
      this.status = status;
    }

    public Partyroom getPartyroom() {
      return partyroom;
    }

    public void setPartyroom(Partyroom partyroom) {
      this.partyroom = partyroom;
    }

    public Client getClient() {
      return client;
    }

    public void setClient(Client client) {
      this.client = client;
    }

    public Score getScore() {
      return score;
    }

    public void setScore(Score score) {
      this.score = score;
    }


    

}
