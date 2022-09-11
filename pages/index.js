import React, { Fragment, useEffect, useState } from 'react'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'
import Head from 'next/head'


const HomePage = (props) => {
  return (
    <Fragment>
        <Head>
            <title>Meetups</title>
            <meta 
                name='description'
                content='Plan meetups wiith your friends'
                />
        </Head>
        <MeetupList meetups={props.meetups}/>
    </Fragment>
  )
}

export async function getStaticProps(){
    //get from api
    const client = await MongoClient.connect(
        "mongodb+srv://satyasaran40:Binnu123@cluster0.fmhshy0.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection('meetups')

      const meetups = await meetupsCollection.find().toArray()

      client.close()

    return {
        props:{
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image:  meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default HomePage