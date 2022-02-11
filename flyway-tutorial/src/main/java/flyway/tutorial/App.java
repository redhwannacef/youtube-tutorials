package flyway.tutorial;

import org.jooq.Field;
import org.jooq.Record;
import org.jooq.SQLDialect;
import org.jooq.Table;
import org.jooq.impl.DSL;
import org.jooq.impl.DefaultDataType;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import static flyway.tutorial.App.UserTable.email;
import static flyway.tutorial.App.UserTable.name;
import static flyway.tutorial.App.UserTable.user;
import static org.jooq.impl.DSL.asterisk;
import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.name;
import static org.jooq.impl.DSL.table;

public class App {

  public static void main(String[] args) {
    try (var connection = dbConnection()) {
      var sql = DSL.using(connection, SQLDialect.POSTGRES);

      sql
        .insertInto(user, email, name)
        .values("blue@example.com", "blue")
        .execute();

      var result = sql.select(asterisk()).from(user)
        .fetch();

      System.out.print(result);
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }


  static class UserTable {
    public static final Table<Record> user = table(name("user"));
    public static final Field<String> email = tableField(user, "email", String.class);
    public static final Field<String> name = tableField(user, "name", String.class);
  }

  private static <T> Field<T> tableField(Table<Record> user, String name, Class<T> type) {
    return field(name(user.getQualifiedName(), name(name)), DefaultDataType.getDataType(SQLDialect.POSTGRES, type));
  }

  private static Connection dbConnection() {
    try {
      return DriverManager.getConnection(
        "jdbc:postgresql://localhost:5432/postgres?currentSchema=migrations_tutorial",
        "postgres",
        "password"
      );
    } catch (SQLException e) {
      throw new RuntimeException("Failed to connect to database", e);
    }
  }

}
