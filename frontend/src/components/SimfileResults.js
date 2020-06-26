import React, { Component } from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, List, ListItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Box} from '@material-ui/core';
import _ from 'underscore';

export default ({ simfileResults }) => {


    const columns = [
        {id: 'artist', label: 'Artist Name'},
        {id: 'name', label: 'Track Name'},
        {id: 'bpm', label: 'BPM'},
        {id: ['pack', 'name'], label: 'Pack Name'},
        {id: 'difficultyMap', label: 'Difficulties'},
    ];

    String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    var rows = []
    for (let [key, value] of Object.entries(simfileResults)) {
            console.log(`${key}: ${value}`);
            rows.push(value)
            for (let [inner_key, inner_value] of Object.entries(simfileResults[key])) {
                console.log(`${inner_key}: ${inner_value}`);
            }
    }

    function StickyHeadTable() {


        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);

        const handleChangePage = (event, newPage) => {
            setPage(newPage);
        };

        const handleChangeRowsPerPage = (event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
        };
        return (

            <Box>
                <TableContainer>
                    <Table simfileTable aria-label='simfile table'>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) =>
                                    <TableCell
                                        key={column.id.toString()}
                                        align="flex-start"
                                    >
                                    <Typography variant='h5'>
                                        {column.label}
                                    </Typography>

                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                              return (
                                  <TableRow hover role="checkbox" key={row.songArtist}>
                                    {columns.map((column) => {
                                      var value = _.property(column.id)(row);
                                      var diffs = []
                                      console.log(row);
                                      for (const [difficulty, val] of Object.entries(row.difficultyMap)) {
                                        diffs.push([difficulty, val])
                                      }
                                      var difflist = diffs.map(
                                          ([difficulty, val]) => (
                                              <ListItem >
                                                <Typography>
                                                  {difficulty.toProperCase()} : {val}
                                                </Typography>
                                              </ListItem>
                                          )
                                      )
                                      return (
                                        <TableCell
                                            key={column.id}
                                            size='small'
                                            align='flex-start'
                                            >
                                          {column.id ==='difficultyMap' ?
                                          <ExpansionPanel className='difficultiesPanel'>
                                            <ExpansionPanelSummary
                                                expandIcon={<MusicNoteIcon />}
                                                className='summaryPanel'
                                            >
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails className='detailsPanel'>
                                              <Typography>
                                                {difflist}
                                              </Typography>
                                            </ExpansionPanelDetails>
                                          </ExpansionPanel>
                                          :
                                          <Typography>{value}</Typography>
                                            }
                                        </TableCell>
                                      );
                                    })}
                                  </TableRow>
                                );
                              })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Box>
        );
    }
    return (
        <Box>
            <StickyHeadTable />
        </Box>
    )
}
