package com.ammar.tasknexus.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Project project;

    @ManyToOne
    private User user;
}
