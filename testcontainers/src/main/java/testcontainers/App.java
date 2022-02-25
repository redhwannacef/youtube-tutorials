package testcontainers;

import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.Record;
import org.jooq.SQLDialect;
import org.jooq.Table;
import org.jooq.impl.DSL;
import org.jooq.impl.DefaultDataType;

import java.sql.Connection;
import java.util.List;

import static org.jooq.impl.DSL.asterisk;
import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.name;
import static org.jooq.impl.DSL.table;
import static testcontainers.App.UserTable.email;
import static testcontainers.App.UserTable.name;
import static testcontainers.App.UserTable.userTable;

public class App {

  private final DSLContext sql;

  public App(Connection connection) {
    this.sql = DSL.using(connection, SQLDialect.POSTGRES);
  }

  public void create(User user) {
    sql
      .insertInto(userTable, email, name)
      .values(user.email(), user.name())
      .execute();
  }

  public List<User> find() {
    return sql
      .select(asterisk())
      .from(userTable)
      .fetch()
      .map(UserTable::map);
  }

  record User(String email, String name) {}

  static class UserTable {
    public static final Table<Record> userTable = table(name("user"));
    public static final Field<String> email = tableField(userTable, "email", String.class);
    public static final Field<String> name = tableField(userTable, "name", String.class);

    public static User map(Record record) {
      return new User(record.get(email), record.get(name));
    }
  }

  private static <T> Field<T> tableField(Table<Record> user, String name, Class<T> type) {
    return field(name(user.getQualifiedName(), name(name)), DefaultDataType.getDataType(SQLDialect.POSTGRES, type));
  }

}
