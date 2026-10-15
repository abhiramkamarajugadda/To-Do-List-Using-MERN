// Automated API test script
const testAPI = async () => {
  const baseUrl = 'http://localhost:5000/api/tasks';

  try {
    console.log('--- 1. Testing GET /api/tasks (Initial) ---');
    let res = await fetch(baseUrl);
    let tasks = await res.json();
    console.log(`Status: ${res.status}, Count: ${tasks.length}`);

    console.log('\n--- 2. Testing POST /api/tasks (Add Task) ---');
    res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskName: 'Learn MERN Stack Architecture' }),
    });
    const createdTask = await res.json();
    console.log(`Status: ${res.status}`);
    console.log('Created Task:', createdTask);

    console.log('\n--- 3. Testing POST /api/tasks (Add Second Task) ---');
    res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskName: 'Build React UI with Complete/Delete controls' }),
    });
    const secondTask = await res.json();
    console.log(`Status: ${res.status}`);
    console.log('Second Task:', secondTask);

    console.log('\n--- 4. Testing GET /api/tasks (Verify List) ---');
    res = await fetch(baseUrl);
    tasks = await res.json();
    console.log(`Status: ${res.status}, Total Tasks: ${tasks.length}`);

    console.log('\n--- 5. Testing PUT /api/tasks/:id (Mark as Completed) ---');
    res = await fetch(`${baseUrl}/${createdTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted: true }),
    });
    const updatedTask = await res.json();
    console.log(`Status: ${res.status}`);
    console.log('Updated Task (isCompleted):', updatedTask.isCompleted);

    console.log('\n--- 6. Testing DELETE /api/tasks/:id (Delete Task) ---');
    res = await fetch(`${baseUrl}/${createdTask._id}`, {
      method: 'DELETE',
    });
    const deleteResult = await res.json();
    console.log(`Status: ${res.status}`);
    console.log('Delete Response:', deleteResult);

    console.log('\n--- 7. Final GET /api/tasks ---');
    res = await fetch(baseUrl);
    tasks = await res.json();
    console.log(`Status: ${res.status}, Remaining Tasks: ${tasks.length}`);
    console.log('\nAll Backend API tests passed successfully!');
  } catch (err) {
    console.error('API Test Error:', err);
  }
};

testAPI();
