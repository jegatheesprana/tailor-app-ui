import { Stack, Box } from '@mui/material';
import { Skeleton } from '@mui/material';

const TableSkeletonLoader = ({ pageSize, columnLength }) => {

    const skeletonArray = Array(pageSize + 1).fill('');
    const skeltonColumn = Array(columnLength).fill('')

    return (
        <Stack sx={{ mt: 1 }}>
            {/* <Box sx={{ width: '95%' }} display="flex" justifyContent="flex-end">
                <Skeleton width='15%' height={'70px'} animation="wave" variant='text' />
            </Box> */}
            {
                skeletonArray.map((row, id) => {
                    return (
                        <Stack direction='row' key={id} mx={2}>
                            {

                                skeltonColumn.map((column, index) => {
                                    return (
                                        <Box sx={{ width: '100%' }} key={index + id} >
                                            <Skeleton width='90%' height={'44.13px'} animation="wave" variant='text' />
                                        </Box>
                                    )
                                })
                            }
                        </Stack>
                    )
                })
            }
            <Stack direction='row'>
                <Box sx={{ width: '100%' }} display="flex" justifyContent="space-between" />
                <Box sx={{ width: '50%' }} display="flex" justifyContent="space-between" mx={2}>
                    <Skeleton width='30%' height={'44.13px'} animation="wave" variant='text' />
                    <Skeleton width='10%' height={'44.13px'} animation="wave" variant='text' />
                    <Skeleton width='20%' height={'44.13px'} animation="wave" variant='text' />
                    <Skeleton width='20%' height={'44.13px'} animation="wave" variant='text' />
                </Box>
            </Stack>
        </Stack>
    )
}

export default TableSkeletonLoader