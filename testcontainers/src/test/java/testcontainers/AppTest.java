package testcontainers;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.PostgreSQLContainer;
import testcontainers.App.User;

import java.sql.DriverManager;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.assertThat;

class AppTest {

  @Test
  void createsAndFindsUsers() throws SQLException {
    try (var postgres = new PostgreSQLContainer<>("postgres:14.1-alpine")) {
      postgres.start();

      Flyway.configure()
        .dataSource(postgres.getJdbcUrl(), postgres.getUsername(), postgres.getPassword())
        .load()
        .migrate();

      var connection = DriverManager.getConnection(postgres.getJdbcUrl(), postgres.getUsername(), postgres.getPassword());
      var testee = new App(connection);

      var red = new User("red@example.com", "Red");
      var blue = new User("blue@example.com", "Blue");

      testee.create(red);
      testee.create(blue);

      assertThat(testee.find()).containsExactlyInAnyOrder(red, blue);
    }
  }
}
