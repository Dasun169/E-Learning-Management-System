package com.example.lms.Service.Impl;

import com.example.lms.Model.Module;
import com.example.lms.Repository.ModuleRepository;
import com.example.lms.Service.ModuleService;

import java.util.List;
import java.util.Optional;
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

    @Override
    public void deleteModuleByHeader(String header) {
        moduleRepository.deleteByHeader(header); // Call the repository method to delete the module by header
    }

    @Override
    public Module updateDescriptionByHeader(String header, String newDescription) {
        Optional<Module> moduleOpt = moduleRepository.findByHeader(header);  // Find the module by header
        if (moduleOpt.isPresent()) {
            Module module = moduleOpt.get();
            module.setDescription(newDescription);  // Set the new description
            return moduleRepository.save(module);  // Save the updated module
        }
        return null;  // If no module found by that header, return null or throw an exception as needed
    }
}
