import { useQuery } from '@tanstack/react-query';
import { userApi } from '../../api/users-api';

export default function Users() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Users</p>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
