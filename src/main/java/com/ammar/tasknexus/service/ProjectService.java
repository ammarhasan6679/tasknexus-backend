package com.ammar.tasknexus.service;

import com.ammar.tasknexus.entity.Project;
import com.ammar.tasknexus.entity.Task;
import com.ammar.tasknexus.exception.ResourceNotFoundException;
import com.ammar.tasknexus.repository.ProjectRepository;
import com.ammar.tasknexus.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));
    }

    public Project updateProject(Long id, Project updatedProject) {

        Project project = getProjectById(id);

        project.setProjectName(updatedProject.getProjectName());
        project.setDescription(updatedProject.getDescription());
        project.setStartDate(updatedProject.getStartDate());
        project.setEndDate(updatedProject.getEndDate());

        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Map<String, Object> getProjectProgress(Long projectId) {

        List<Task> tasks = taskRepository.findByProjectId(projectId);

        int totalTasks = tasks.size();

        long completedTasks = tasks.stream()
                .filter(task -> task.getStatus().equals("DONE"))
                .count();

        long pendingTasks = totalTasks - completedTasks;

        double progress = totalTasks == 0
                ? 0
                : ((double) completedTasks / totalTasks) * 100;

        Map<String, Object> response = new HashMap<>();

        response.put("totalTasks", totalTasks);
        response.put("completedTasks", completedTasks);
        response.put("pendingTasks", pendingTasks);
        response.put("progress", progress);

        return response;
    }
}
