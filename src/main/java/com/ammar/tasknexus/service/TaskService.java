package com.ammar.tasknexus.service;

import com.ammar.tasknexus.dto.StatusUpdateRequest;
import com.ammar.tasknexus.entity.Task;
import com.ammar.tasknexus.entity.User;
import com.ammar.tasknexus.exception.ResourceNotFoundException;
import com.ammar.tasknexus.repository.TaskRepository;
import com.ammar.tasknexus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getTasksByProject(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    public Task updateTask(Long id, Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        task.setDeadline(updatedTask.getDeadline());

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task assignTask(Long taskId, Long userId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        task.setAssignedUser(user);

        return taskRepository.save(task);
    }

    public Task updateTaskStatus(Long taskId,
                                 StatusUpdateRequest request) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        task.setStatus(request.getStatus());

        return taskRepository.save(task);
    }
}
