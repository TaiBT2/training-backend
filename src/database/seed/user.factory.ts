import { User } from '../../users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

export default setSeederFactory(User, async (faker) => {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash('12345678', salt);
  const user = new User({});
  user.firstName = faker.name.firstName('male');
  user.lastName = faker.name.lastName('male');
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.password = password;
  user.username = faker.internet.userName();
  user.avatar = faker.internet.avatar();

  return user;
});
