import React, { useState } from 'react';

const DynamicTableForStatistics = ({ onSubmit }) => {
  const [graphSettings, setGraphSettings] = useState({
    type: "radar", // Default graph type
    name: "",
    point: "",
  });
  const [rows, setRows] = useState([{ key: '', value: '' }]);

  // Handle change in graph settings
  const handleGraphSettingsChange = (field, value) => {
    setGraphSettings({ ...graphSettings, [field]: value });
  };

  // Handle change in table rows
  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // Add a new row to the table
  const addRow = () => {
    setRows([...rows, { key: '', value: '' }]);
  };

  // Remove a row from the table
  const removeRow = (index) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  // Prepare and submit the data
  const handleSubmit = () => {
    const formattedData = {
      ...graphSettings,
      data: rows.map(row => ({
        [graphSettings.name]: row.key,
        [graphSettings.point]: parseFloat(row.value)
      }))
    };
    onSubmit(formattedData); // This could be a prop function to lift state up or set state elsewhere
  };

  return (
    <div>
      <div>
        <label>
          Graph Type:
          <select value={graphSettings.type} onChange={(e) => handleGraphSettingsChange('type', e.target.value)}>
            <option value="radar">Radar</option>
            <option value="bar">Bar</option>
            {/* Add other graph types as needed */}
          </select>
        </label>
        <label>
          Name Key:
          <input
            type="text"
            value={graphSettings.name}
            onChange={(e) => handleGraphSettingsChange('name', e.target.value)}
            placeholder="e.g., subject"
          />
        </label>
        <label>
          Point Key:
          <input
            type="text"
            value={graphSettings.point}
            onChange={(e) => handleGraphSettingsChange('point', e.target.value)}
            placeholder="e.g., level"
          />
        </label>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>{graphSettings.name || 'Key'}</th>
            <th>{graphSettings.point || 'Value'}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.key}
                  onChange={(e) => handleChange(index, 'key', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.value}
                  onChange={(e) => handleChange(index, 'value', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => removeRow(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
      <button onClick={handleSubmit}>Done</button>
    </div>
  );
};

export default DynamicTableForStatistics;
