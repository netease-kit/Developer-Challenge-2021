package com.logic.mine.my_following

import androidx.databinding.ObservableArrayList
import androidx.lifecycle.ViewModel
import com.logic.mine.R
import me.tatarka.bindingcollectionadapter2.ItemBinding
import me.tatarka.bindingcollectionadapter2.recyclerview.BR

class FollowingViewModel : ViewModel() {

  val items = ObservableArrayList<String>()
  val itemBinding: ItemBinding<String> = ItemBinding.of(BR.item, R.layout.item_my_following)

  init {
    items.add("中国")
    items.add("美国")
    items.add("俄罗斯")
    items.add("日本")
    items.add("韩国")
  }

}