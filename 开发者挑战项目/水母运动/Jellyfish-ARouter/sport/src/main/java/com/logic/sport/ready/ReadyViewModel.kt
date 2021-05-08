package com.logic.sport.ready

import android.view.View
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.logic.sport.utils.Event
import com.logic.utils.Cache

class ReadyViewModel : ViewModel() {

  private val _startEvent = MutableLiveData<Event<Unit>>()
  val startEvent: LiveData<Event<Unit>> = _startEvent

  private val _showProgress = MutableLiveData<Boolean>()
  val showProgress: LiveData<Boolean> = _showProgress

  fun startGPSLocation() {
    Cache.isLocationSDK = true
    _startEvent.value = Event(Unit)
  }

  fun deleteTrack(v: View) {
//    viewModelScope.launch {
//      RoomFactory.repository.deleteLatLngs()
//      v.toast("删除成功")
//    }
  }

}