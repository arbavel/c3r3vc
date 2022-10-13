package com.usa.ciclo3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usa.ciclo3.model.Client;
import com.usa.ciclo3.repository.ClientRepository;

@Service
public class ClientService {

	@Autowired
  private ClientRepository clientRepository;

  public List<Client> getAll() {
    return (List<Client>) clientRepository.getAll();
  }
  
  public Optional<Client> getClient(int id){
		return clientRepository.getClient(id);
	}
    
  public Client save(Client client) {
		// return clientRepository.save(client);

		if (client.getIdClient() == null) {
			return clientRepository.save(client);
		} else {
			Optional<Client> paux = clientRepository.getClient(client.getIdClient());
			if (paux.isEmpty()) {
				return clientRepository.save(client);
			} else {
				return client;
			}
		}

	}

	public Client actualizarClient(Client client) {
		if (client.getIdClient() != null) {
			Optional<Client> e = clientRepository.getClient(client.getIdClient());
			if (!e.isEmpty()) {
				if (client.getEmail() != null) {
					e.get().setEmail(client.getEmail());
				}
				if (client.getPassword() != null) {
					e.get().setPassword(client.getPassword());
				}
				if (client.getName() != null) {
					e.get().setName(client.getName());
				}
				if (client.getAge() != null) {
					e.get().setAge(client.getAge());
				}				

				clientRepository.save(e.get());
				return e.get();
			} else {
				return client;
			}
		} else {
			return client;
		}

	}

    
    public boolean borrarClient(int id) {
		boolean flag=false;
        Optional<Client> c= clientRepository.getClient(id);
        if(c.isPresent()){
            clientRepository.delete(c.get());
            flag=true;
        }
        return flag;

	}
  
}
