import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Button } from 'react-bootstrap';

const Show = () => {
    const [entries, setEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [showd, setShowd] = useState("");
    const [open, setOpen] = useState(false);
    const [filterName, setFilterName] = useState("");

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(() => {
        // Fetch data from the specified endpoint
        fetch('https://tuf-task-backend.onrender.com/show')
            .then(response => response.json())
            .then(data => {
                data.reverse();
                data.forEach((entry, index) => entry.timestamp = new Date(entry.timestamp).toLocaleString());
                setEntries(data);
                setFilteredEntries(data); // Initialize filtered entries with all entries
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleShow = (data) => {
        let sBB = data.split(';').join(';<br />'); 
        sBB= sBB.split('{').join('<br/>{<br/>');
        sBB= sBB.split('}').join('}<br/>');
        setShowd(sBB);
        onOpenModal();
    };

    const handleFilter = () => {
        const filtered = entries.filter(entry =>
            entry.username.toLowerCase().includes(filterName.toLowerCase())
        );
        setFilteredEntries(filtered);
    };

    return (
        <div className='tableContainer'>
            <div>
                <Modal open={open} onClose={onCloseModal} center>
                    <h2>Here is the Full Code</h2>
                    <div className="dark-theme" dangerouslySetInnerHTML={{ __html: showd }}></div>
                </Modal>
            </div>
            <div className='filterShow'>
                <input
                    type="text"
                    placeholder="Enter username to filter"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)} 
                    className='dark-theme'
                />
                <Button variant="primary" onClick={handleFilter}>Filter</Button>
            </div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Language</Th>
                        <Th>Standard Input</Th>
                        <Th>Timestamp</Th>
                        <Th>Source Code</Th>
                        <Th>Output</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredEntries.length > 0 ? filteredEntries.map(entry => (
                        <Tr key={entry.id}>
                            <Td>{entry.username}</Td>
                            <Td>{entry.language}</Td>
                            <Td>{entry.stdin}</Td>
                            <Td>{entry.timestamp}</Td>
                            <Td>{entry.code.substring(0, 100)} <Button variant="warning" onClick={() => { handleShow(entry.code) }}>See Full Code</Button></Td>
                            <Td>{entry.stdout}</Td>
                        </Tr>
                    )) : <Tr><Td colSpan={5}>No Data</Td></Tr>}
                </Tbody>
            </Table>
        </div>
    );
};

export default Show;
