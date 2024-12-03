package com.example.lms.Controller;

import com.example.lms.Model.Module;
import com.example.lms.Service.ModuleService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/modules"})
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    public ModuleController(){
    }

    @PostMapping
    public ResponseEntity<Module> createModule(@RequestBody Module module) {
        Module createdModule = this.moduleService.createModule(module);
        return ResponseEntity.ok(createdModule);
    }

    @GetMapping
    public ResponseEntity<List<Module>> getAllModules() {
        List<Module> modules = this.moduleService.getAllModules();
        return ResponseEntity.ok(modules);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<Module> updateModule(@PathVariable long id, @RequestBody Module module) {
        Module updatedModule = this.moduleService.updateModule(id, module);
        return updatedModule != null ? ResponseEntity.ok(updatedModule) : ResponseEntity.notFound().build();
    }

    @DeleteMapping({"/{id}"})
    public ResponseEntity<Void> deleteModule(@PathVariable long id) {
        this.moduleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }

}
