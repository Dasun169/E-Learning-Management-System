package com.example.lms.Service;

import com.example.lms.Model.Module;

import java.util.List;

public interface ModuleService {
    Module createModule(Module module);
    List<Module> getAllModules();
    Module updateModule(long id, Module module);
    void deleteModule(long id);
}
