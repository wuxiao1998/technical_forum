package jee.sanda.forum.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"jee.sanda.forum"})
@EnableJpaRepositories("jee.sanda.forum.repository")
@EntityScan("jee.sanda.forum.entity")
public class TechnicalForumApplication {
    public static void main(String[] args) {
        SpringApplication.run(TechnicalForumApplication.class,args);
    }
}
