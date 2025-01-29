package com.example.lms.Service.Impl;

import com.example.lms.Model.Module;
import com.example.lms.Repository.ModuleRepository;
import com.example.lms.Service.ModuleService;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModuleServiceImpl implements ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Override
    public Module createModule(Module module) {
        return moduleRepository.save(module);
    }

    @Override
    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    @Override
    public List<Module> getModulesByCourseCodeSortedByDate(String courseCode) {
        return moduleRepository.findByCourseCodeOrderByCreatedDateAsc(courseCode);  // Fetch sorted by createdDate
    }
}
