package com.example.lms.Service.Impl;

import com.example.lms.Model.Sequence;
import com.example.lms.Repository.SequenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SequenceService {

    @Autowired
    private SequenceRepository sequenceRepository;

    @Transactional
    public long getNextSequenceId(String key) {
        Sequence sequence = sequenceRepository.findById(key).orElse(null);
        if (sequence == null) {
            sequence = new Sequence();
            sequence.setId(key);
            sequence.setSeq(1);
            sequenceRepository.save(sequence);
            return 1;
        }
        long nextId = sequence.getSeq() + 1;
        sequence.setSeq(nextId);
        sequenceRepository.save(sequence);
        return nextId;
    }
}
