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
    return  partyroomRepository.getAll();
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



  public Partyroom actualizarPartyroom(Partyroom partyroom) {
		if (partyroom.getId() != null) {
			Optional<Partyroom> e = partyroomRepository.getPartyroom(partyroom.getId());
			if (!e.isEmpty()) {
				if (partyroom.getName() != null) {
					e.get().setName(partyroom.getName());
				}
				if (partyroom.getOwner() != null) {
					e.get().setOwner(partyroom.getOwner());
				}
				if (partyroom.getCapacity() != null) {
					e.get().setCapacity(partyroom.getCapacity());
				}
				if (partyroom.getDescription() != null) {
					e.get().setDescription(partyroom.getDescription());
				}

				partyroomRepository.save(e.get());
				return e.get();
			} else {
				return partyroom;
			}
		} else {
			return partyroom;
		}

	}

	public boolean borrarPartyroom(int id) {
		boolean flag = false;
		Optional<Partyroom> c = partyroomRepository.getPartyroom(id);
		if (c.isPresent()) {
			partyroomRepository.delete(c.get());
			flag = true;
		}
		return flag;

	}

}
