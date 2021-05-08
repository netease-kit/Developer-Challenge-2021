package com.logic.utils.room

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

/**
 * 这里面都是直接对数据库的操作
 */
@Dao
interface Dao {

  @Query("SELECT * FROM PathRecord")
  suspend fun getPathRecords(): List<PathRecord>

  @Query("DELETE FROM PathRecord")
  suspend fun deletePathRecords()

  @Insert
  suspend fun insertPathRecord(pathRecord: PathRecord)

}