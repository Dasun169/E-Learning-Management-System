package com.example.lms.Service;

import com.example.lms.Model.Module;

import java.util.List;

public interface ModuleService {
    Module createModule(Module module);
    List<Module> getAllModules();

    List<Module> getModulesByCourseCodeSortedByDate(String courseCode); 
    void deleteModuleByHeader(String header);
    Module updateDescriptionByHeader(String header, String newDescription); 
}
