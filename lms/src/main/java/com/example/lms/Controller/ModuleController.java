package com.example.lms.Controller;

import com.example.lms.Model.Module;
import com.example.lms.Service.ModuleService;

import java.time.LocalDateTime;
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
        module.setCreatedDate(LocalDateTime.now()); // Auto-set createdDate
        Module createdModule = moduleService.createModule(module);
        return ResponseEntity.ok(createdModule);
    }

    @GetMapping
    public ResponseEntity<List<Module>> getAllModules() {
        List<Module> modules = this.moduleService.getAllModules();
        return ResponseEntity.ok(modules);
    }

    @GetMapping("/course/{courseCode}")
    public ResponseEntity<List<Module>> getModulesByCourseCodeSortedByDate(@PathVariable String courseCode) {
        List<Module> modules = moduleService.getModulesByCourseCodeSortedByDate(courseCode);
        if (modules.isEmpty()) {
            return ResponseEntity.noContent().build();  // Return 204 if no modules found
        }
        return ResponseEntity.ok(modules);  // Return 200 with the list of modules
    }

    @DeleteMapping("/delete/{header}")
    public ResponseEntity<Void> deleteModuleByHeader(@PathVariable String header) {
        moduleService.deleteModuleByHeader(header); // Call the service to delete by header
        return ResponseEntity.noContent().build();  // Return 204 No Content after deletion
    }

    @PutMapping("/update/{header}")
    public ResponseEntity<Module> updateDescriptionByHeader(@PathVariable String header, @RequestBody String newDescription) {
        Module updatedModule = moduleService.updateDescriptionByHeader(header, newDescription);
        if (updatedModule != null) {
            return ResponseEntity.ok(updatedModule);  // Return the updated module
        }
        return ResponseEntity.notFound().build();  // Return 404 if the module with that header doesn't exist
    }
}
