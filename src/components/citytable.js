import React from 'react'
import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, TablePagination, Paper, IconButton, Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import NextLink from 'next/link';
import View from '@material-ui/icons/VisibilityRounded';

const StyledTableCell = withStyles((theme) => ({
    head: {
      height: 40,
    },
    body: {
      fontSize: 14,
      cursor: 'pointer',
      '&:hover': {
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
      }
    },
}))(TableCell);


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'state', numeric: false, disablePadding: true, label: 'Country' },
    { id: 'location', numeric: false, disablePadding: true, label: 'Location' }
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow style={{ boxShadow: 'rgba(0, 0, 0, 0.09) 0px 3px 12px' }}>
            <StyledTableCell padding="checkbox">
            </StyledTableCell>
                {headCells.map((headCell) => (
                    <StyledTableCell
                    key={headCell.id}
                    align="left"
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px'
    },
    table: {
        width: '100%',
        fontFamily: 'Poppins'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const CityTable = (props) => {
    const { rows } = props;

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return ( 
        <Paper className={classes.paper}>
            <TableContainer>
                <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="medium"
                aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {
                            stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow
                                    hover
                                    key={row.id}
                                    >
                                        <NextLink href="/city/[id]" as={`/city/${row.id}`}>
                                            <TableCell>
                                                <IconButton aria-label="view">
                                                    <View style={{ color: '#a0a3b3', width: 20 }} />
                                                </IconButton>
                                            </TableCell>
                                        </NextLink>
                                        <TableCell component="th" id={row.id} scope="row" padding="none">
                                            {row.id}
                                        </TableCell>
                                        <NextLink href="/city/[id]" as={`/city/${row.id}`}>
                                            <StyledTableCell align="left">
                                                {row.name}
                                            </StyledTableCell>
                                        </NextLink>
                                        <TableCell align="left">{row.country}</TableCell>
                                        <TableCell align="left">{row.coord.lon}  {row.coord.lat}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>

    );
}
 
export default CityTable;