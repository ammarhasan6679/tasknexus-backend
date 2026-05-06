package com.ammar.tasknexus.dto;

import com.ammar.tasknexus.entity.TaskStatus;
import lombok.Data;

@Data
public class StatusUpdateRequest {
    private TaskStatus status;
}
