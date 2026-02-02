package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.example.backend.repository.UserRepository;
import com.example.backend.entity.User;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		// Load .env (if present) and set system properties so Spring can resolve ${MYSQL_URL} etc.
		try {
			Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
			String url = dotenv.get("MYSQL_URL");
			String user = dotenv.get("MYSQL_USER");
			String pass = dotenv.get("MYSQL_PASSWORD");
			if (url != null && !url.isBlank()) System.setProperty("MYSQL_URL", url);
			if (user != null && !user.isBlank()) System.setProperty("MYSQL_USER", user);
			if (pass != null && !pass.isBlank()) System.setProperty("MYSQL_PASSWORD", pass);
		} catch (Throwable t) {
			System.err.println("Warning: could not load .env: " + t.getMessage());
		}

		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner test(UserRepository repo) {
		return args -> {
			repo.save(new User(null, "Nguyen"));
			System.out.println("Count: " + repo.count());
		};
	}

}
