import bcrypt from 'bcryptjs';

const users = [
  // bcrypt hashes for passwords: 'pass', 'pass2', 'pass3', 'admin'
  { username: "user", passwordHash: "$2a$10$O6J1H2/VuEMiHX3Nmo0N/uIH5zZc3OmM71vtfC63d0S7JYwTQWWeW" },
  { username: "user2", passwordHash: "$2a$10$7N0txbHhrNmv6D0LUyb2WO9eFihP5mITfFg3bXLyXAV0LncaJVLme" },
  { username: "user3", passwordHash: "$2a$10$P46V4Sxv8kaWntG/iSZ7FOUkyKps05vGqQlOwGn6s3QaEB3Tpi6Rm" },
  { username: "admin", passwordHash: "$2a$10$5dkBqV0q5W0nLhIGYbVUs.yhGVpZbzKxsjM0g05Aq5WyixMJX4nX6" }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Only POST allowed" });

  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: "Username and password required" });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "Invalid username or password" });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: "Invalid username or password" });

  return res.status(200).json({ message: "Login successful", username });
}
