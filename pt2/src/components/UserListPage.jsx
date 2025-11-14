import React, { useEffect, useState, useMemo } from 'react';
import { Container, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name_asc');

  const loadUsers = async () => {
    setLoading(true);
    const res = await axios.get('http://localhost:3001/users');
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let result = [...users];
    if (searchTerm)
      result = result.filter(
        (u) =>
          u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (sortOption === 'name_asc') result.sort((a, b) => a.fullName.localeCompare(b.fullName));
    if (sortOption === 'name_desc') result.sort((a, b) => b.fullName.localeCompare(a.fullName));
    if (sortOption === 'role') result.sort((a, b) => a.role.localeCompare(b.role));
    return result;
  }, [users, searchTerm, sortOption]);

  return (
    <>
      <NavigationHeader />
      <Container>
        <Card className="p-3 shadow-sm mt-3">
          <h4>User Management</h4>
          <UserFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          {loading ? (
            <div className="text-center"><Spinner animation="border" /></div>
          ) : (
            <UserTable users={filteredUsers} reloadUsers={loadUsers} />
          )}
        </Card>
      </Container>
    </>
  );
};

export default UserListPage;
