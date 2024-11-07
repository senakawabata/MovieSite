import AppLayout from '@/components/Layouts/AppLayout'
import { Card, CardMedia, Grid, Link, Typography, Box } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'

export default function UpComing() {
    const fetcher = url => fetch(url).then(res => res.json())
    const { data: upComingItems, error } = useSWR('api/getUpComingMovies', fetcher)

    console.log(upComingItems)

    if (error) {
        return <div>エラーが発生しました</div>
    }

    if (!upComingItems) {
        return <div>読み込み中...</div>
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    公開予定の映画
                </h2>
            }>
            <Head>
                <title>公開予定の映画 - CinemaLoveReview</title>
            </Head>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {upComingItems.results.map(movie => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                            <Link
                                href={`/detail/movie/${movie.id}`}
                                underline="none">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        height="500"
                                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="h6" component="div">
                                            {movie.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            公開日: {movie.release_date}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </AppLayout>
    )
}