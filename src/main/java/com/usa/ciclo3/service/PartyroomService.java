package com.usa.ciclo3.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usa.ciclo3.model.Partyroom;
import com.usa.ciclo3.repository.PartyroomRepository;

@Service
public class PartyroomService {

  @Autowired
  private PartyroomRepository partyroomRepository;

  public List<Partyroom> getAll() {
    return (List<Partyroom>) partyroomRepository.getAll();
  }

  public Optional<Partyroom> getPartyroom(int id) {
    return partyroomRepository.getPartyroom(id);
  }

  public Partyroom save(Partyroom partyroom) {

    if (partyroom.getId() == null) {
      return partyroomRepository.save(partyroom);
    } else {
      Optional<Partyroom> paux = partyroomRepository.getPartyroom(partyroom.getId());
      if (paux.isEmpty()) {
        return partyroomRepository.save(partyroom);
      } else {
        return partyroom;
      }
    }

  }

}
