package com.usa.ciclo3.model.DTOs;

import com.usa.ciclo3.model.Client;

public class TotalAndClient {
	
	private Long total;
	
	private Client client;
	
	public TotalAndClient(Long total, Client client) {
		super();
		this.total = total;
		this.client = client;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}
	
	

}
