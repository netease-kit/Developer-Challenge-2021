package com.logic.mine

import com.logic.mine.databinding.FragmentMineBinding
import com.logic.utils.BaseFragment

class MineFragment : BaseFragment<MineViewModel, FragmentMineBinding>(
  R.layout.fragment_mine
) {

  override fun init() {
    binding.viewmodel = viewModel
  }

}
